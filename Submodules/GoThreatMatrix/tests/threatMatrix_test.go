package tests

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/khulnasoft/go-threatmatrix/gothreatmatrix"
	"github.com/sirupsen/logrus"
)

// * Test Data Struct used for every struct obj
type TestData struct {
	Input      interface{}
	Data       string
	StatusCode int
	Want       interface{}
}

// Setting up the router, client, and test server
func setup() (testClient gothreatmatrix.ThreatMatrixClient, apiHandler *http.ServeMux, closeServer func()) {

	apiHandler = http.NewServeMux()

	testServer := httptest.NewServer(apiHandler)

	testClient = NewTestThreatMatrixClient(testServer.URL)

	return testClient, apiHandler, testServer.Close

}

// Helper test
// Testing the request method is as expected
func testMethod(t *testing.T, request *http.Request, wantedMethod string) {
	t.Helper()
	if got := request.Method; got != wantedMethod {
		t.Errorf("Request method: %v, want %v", got, wantedMethod)
	}
}

// Helper test
// Testing if it was an Error response
func testError(t *testing.T, testData TestData, err error) {
	t.Helper()
	if testData.StatusCode < http.StatusOK || testData.StatusCode >= http.StatusBadRequest {
		diff := cmp.Diff(testData.Want, err, cmpopts.IgnoreFields(gothreatmatrix.ThreatMatrixError{}, "Response"))
		if diff != "" {
			t.Fatalf(diff)
		}
	}
}

// Helper test
// Testing if it was the expected response
func testWantData(t *testing.T, want interface{}, data interface{}) {
	t.Helper()
	diff := cmp.Diff(want, data)
	if diff != "" {
		t.Fatalf(diff)
	}
}

func serverHandler(t *testing.T, testData TestData, expectedMethod string) http.Handler {
	handler := func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, expectedMethod)
		if testData.StatusCode > 0 {
			w.WriteHeader(testData.StatusCode)
		}
		if len(testData.Data) > 0 {
			_, err := w.Write([]byte(testData.Data))
			if err != nil {
				//* writing an empty object to signifiy could not convert data!
				fmt.Fprintf(w, "{}")
			}
		}
	}

	return http.HandlerFunc(handler)
}

func NewTestThreatMatrixClient(url string) gothreatmatrix.ThreatMatrixClient {
	return gothreatmatrix.NewThreatMatrixClient(
		&gothreatmatrix.ThreatMatrixClientOptions{
			Url:         url,
			Token:       "test-token",
			Certificate: "",
		},
		nil,
		&gothreatmatrix.LoggerParams{
			File:      nil,
			Formatter: nil,
			Level:     logrus.DebugLevel,
		},
	)
}
