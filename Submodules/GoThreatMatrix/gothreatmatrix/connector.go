package gothreatmatrix

import (
	"context"
	"encoding/json"
	"fmt"
	"sort"

	"github.com/khulnasoft/go-threatmatrix/constants"
)

// ConnectorConfig represents how a connector is configured in ThreatMatrix.
//
// ThreatMatrix docs: https://threatmatrix.readthedocs.io/en/latest/Usage.html#connectors-customization
type ConnectorConfig struct {
	BaseConfigurationType
	MaximumTlp TLP `json:"maximum_tlp"`
}

// ConnectorService handles communication with connector related methods of the ThreatMatrix API.
//
// ThreatMatrix REST API docs: https://threatmatrix.readthedocs.io/en/latest/Redoc.html#tag/connector
type ConnectorService struct {
	client *ThreatMatrixClient
}

// GetConfigs lists down every connector configuration in your ThreatMatrix instance.
//
//	Endpoint: GET /api/get_connector_configs
//
// ThreatMatrix REST API docs: https://threatmatrix.readthedocs.io/en/latest/Redoc.html#tag/get_connector_configs
func (connectorService *ConnectorService) GetConfigs(ctx context.Context) (*[]ConnectorConfig, error) {
	requestUrl := connectorService.client.options.Url + constants.CONNECTOR_CONFIG_URL
	contentType := "application/json"
	method := "GET"
	request, err := connectorService.client.buildRequest(ctx, method, contentType, nil, requestUrl)
	if err != nil {
		return nil, err
	}

	successResp, err := connectorService.client.newRequest(ctx, request)
	if err != nil {
		return nil, err
	}
	connectorConfigurationResponse := map[string]ConnectorConfig{}
	if unmarshalError := json.Unmarshal(successResp.Data, &connectorConfigurationResponse); unmarshalError != nil {
		return nil, unmarshalError
	}

	connectorNames := make([]string, 0)
	// *getting all the analyzer key names!
	for connectorName := range connectorConfigurationResponse {
		connectorNames = append(connectorNames, connectorName)
	}
	// * sorting them alphabetically
	sort.Strings(connectorNames)
	connectorConfigurationList := []ConnectorConfig{}
	for _, connectorName := range connectorNames {
		connectorConfig := connectorConfigurationResponse[connectorName]
		connectorConfigurationList = append(connectorConfigurationList, connectorConfig)
	}
	return &connectorConfigurationList, nil
}

// HealthCheck checks if the specified connector is up and running
//
//	Endpoint: GET /api/connector/{NameOfConnector}/healthcheck
//
// ThreatMatrix REST API docs: https://threatmatrix.readthedocs.io/en/latest/Redoc.html#tag/connector/operation/connector_healthcheck_retrieve
func (connectorService *ConnectorService) HealthCheck(ctx context.Context, connectorName string) (bool, error) {
	route := connectorService.client.options.Url + constants.CONNECTOR_HEALTHCHECK_URL
	requestUrl := fmt.Sprintf(route, connectorName)
	contentType := "application/json"
	method := "GET"
	request, err := connectorService.client.buildRequest(ctx, method, contentType, nil, requestUrl)
	if err != nil {
		return false, err
	}
	status := StatusResponse{}
	successResp, err := connectorService.client.newRequest(ctx, request)
	if err != nil {
		return false, err
	}
	if unmarshalError := json.Unmarshal(successResp.Data, &status); unmarshalError != nil {
		return false, unmarshalError
	}
	return status.Status, nil
}
