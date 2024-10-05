// go-threatmatrix provides an SDK to easily integrate threatmatrix with your own set of tools.

// go-threatmatrix makes it easy to automate, configure, and use threatmatrix with your own set of tools
// with its Idiomatic approach making an analysis is easy as just writing one line of code!
package gothreatmatrix

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"
)

// ThreatMatrixError represents an error that has occurred when communicating with ThreatMatrix.
type ThreatMatrixError struct {
	StatusCode int
	Message    string
	Response   *http.Response
}

// Error lets you implement the error interface.
// This is used for making custom go errors.
func (threatMatrixError *ThreatMatrixError) Error() string {
	errorMessage := fmt.Sprintf("Status Code: %d \n Error: %s", threatMatrixError.StatusCode, threatMatrixError.Message)
	return errorMessage
}

// newThreatMatrixError lets you easily create new ThreatMatrixErrors.
func newThreatMatrixError(statusCode int, message string, response *http.Response) *ThreatMatrixError {
	return &ThreatMatrixError{
		StatusCode: statusCode,
		Message:    message,
		Response:   response,
	}
}

type successResponse struct {
	StatusCode int
	Data       []byte
}

// ThreatMatrixClientOptions represents the fields needed to configure and use the ThreatMatrixClient
type ThreatMatrixClientOptions struct {
	Url   string `json:"url"`
	Token string `json:"token"`
	// Certificate represents your SSL cert: path to the cert file!
	Certificate string `json:"certificate"`
	// Timeout is in seconds
	Timeout uint64 `json:"timeout"`
}

// ThreatMatrixClient handles all the communication with your ThreatMatrix instance.
type ThreatMatrixClient struct {
	options          *ThreatMatrixClientOptions
	client           *http.Client
	TagService       *TagService
	JobService       *JobService
	AnalyzerService  *AnalyzerService
	ConnectorService *ConnectorService
	UserService      *UserService
	Logger           *ThreatMatrixLogger
}

// TLP represents an enum for the TLP attribute used in ThreatMatrix's REST API.
//
// ThreatMatrix docs: https://threatmatrix.readthedocs.io/en/latest/Usage.html#tlp-support
type TLP int

// Values of the TLP enum.
const (
	WHITE TLP = iota + 1
	GREEN
	AMBER
	RED
)

// TLPVALUES represents a map to easily access the TLP values.
var TLPVALUES = map[string]int{
	"WHITE": 1,
	"GREEN": 2,
	"AMBER": 3,
	"RED":   4,
}

// Overriding the String method to get the string representation of the TLP enum
func (tlp TLP) String() string {
	switch tlp {
	case WHITE:
		return "WHITE"
	case GREEN:
		return "GREEN"
	case AMBER:
		return "AMBER"
	case RED:
		return "RED"
	}
	return "WHITE"
}

// ParseTLP is used to easily make a TLP enum
func ParseTLP(s string) TLP {
	s = strings.TrimSpace(s)
	value, ok := TLPVALUES[s]
	if !ok {
		return TLP(0)
	}
	return TLP(value)
}

// Implementing the MarshalJSON interface to make our custom Marshal for the enum
func (tlp TLP) MarshalJSON() ([]byte, error) {
	return json.Marshal(tlp.String())
}

// Implementing the UnmarshalJSON interface to make our custom Unmarshal for the enum
func (tlp *TLP) UnmarshalJSON(data []byte) (err error) {
	var tlpString string
	if err := json.Unmarshal(data, &tlpString); err != nil {
		return err
	}
	if *tlp = ParseTLP(tlpString); err != nil {
		return err
	}
	return nil
}

// NewThreatMatrixClient lets you easily create a new ThreatMatrixClient by providing ThreatMatrixClientOptions, http.Clients, and LoggerParams.
func NewThreatMatrixClient(options *ThreatMatrixClientOptions, httpClient *http.Client, loggerParams *LoggerParams) ThreatMatrixClient {

	var timeout time.Duration

	if options.Timeout == 0 {
		timeout = time.Duration(10) * time.Second
	} else {
		timeout = time.Duration(options.Timeout) * time.Second
	}

	// configuring the http.Client
	if httpClient == nil {
		httpClient = &http.Client{
			Timeout: timeout,
		}
	}

	// configuring the client
	client := ThreatMatrixClient{
		options: options,
		client:  httpClient,
	}

	// Adding the services
	client.TagService = &TagService{
		client: &client,
	}
	client.JobService = &JobService{
		client: &client,
	}
	client.AnalyzerService = &AnalyzerService{
		client: &client,
	}
	client.ConnectorService = &ConnectorService{
		client: &client,
	}
	client.UserService = &UserService{
		client: &client,
	}

	// configuring the logger!
	client.Logger = &ThreatMatrixLogger{}
	client.Logger.Init(loggerParams)

	return client
}

// NewThreatMatrixClientThroughJsonFile lets you create a new ThreatMatrixClient through a JSON file that contains your ThreatMatrixClientOptions
func NewThreatMatrixClientThroughJsonFile(filePath string, httpClient *http.Client, loggerParams *LoggerParams) (*ThreatMatrixClient, error) {
	optionsBytes, err := os.ReadFile(filePath)
	if err != nil {
		errorMessage := fmt.Sprintf("Could not read %s", filePath)
		threatMatrixError := newThreatMatrixError(400, errorMessage, nil)
		return nil, threatMatrixError
	}

	threatMatrixClientOptions := &ThreatMatrixClientOptions{}
	if unmarshalError := json.Unmarshal(optionsBytes, &threatMatrixClientOptions); unmarshalError != nil {
		return nil, unmarshalError
	}

	threatMatrixClient := NewThreatMatrixClient(threatMatrixClientOptions, httpClient, loggerParams)

	return &threatMatrixClient, nil
}

// buildRequest is used for building requests.
func (client *ThreatMatrixClient) buildRequest(ctx context.Context, method string, contentType string, body io.Reader, url string) (*http.Request, error) {
	request, err := http.NewRequestWithContext(ctx, method, url, body)
	if err != nil {
		return nil, err
	}
	request.Header.Set("Content-Type", contentType)

	tokenString := fmt.Sprintf("token %s", client.options.Token)

	request.Header.Set("Authorization", tokenString)
	return request, nil
}

// newRequest is used for making requests.
func (client *ThreatMatrixClient) newRequest(ctx context.Context, request *http.Request) (*successResponse, error) {
	response, err := client.client.Do(request)

	// Checking for context errors such as reaching the deadline and/or Timeout
	if err != nil {
		select {
		case <-ctx.Done():
			return nil, ctx.Err()
		default:
		}
		return nil, err
	}

	defer response.Body.Close()

	msgBytes, err := ioutil.ReadAll(response.Body)
	statusCode := response.StatusCode
	if err != nil {
		errorMessage := fmt.Sprintf("Could not convert JSON response. Status code: %d", statusCode)
		threatMatrixError := newThreatMatrixError(statusCode, errorMessage, response)
		return nil, threatMatrixError
	}

	if statusCode < http.StatusOK || statusCode >= http.StatusBadRequest {
		errorMessage := string(msgBytes)
		threatMatrixError := newThreatMatrixError(statusCode, errorMessage, response)
		return nil, threatMatrixError
	}

	sucessResp := successResponse{
		StatusCode: statusCode,
		Data:       msgBytes,
	}

	return &sucessResp, nil
}
