package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/khulnasoft/go-threatmatrix/gothreatmatrix"
	"github.com/sirupsen/logrus"
)

func main() {

	// Configuring the ThreatMatrixClient!
	clientOptions := gothreatmatrix.ThreatMatrixClientOptions{
		Url:         "PUT-YOUR-THREATMATRIX-INSTANCE-URL-HERE",
		Token:       "PUT-YOUR-TOKEN-HERE",
		Certificate: "",
		Timeout:     0,
	}

	loggerParams := &gothreatmatrix.LoggerParams{
		File:      nil,
		Formatter: &logrus.JSONFormatter{},
		Level:     logrus.DebugLevel,
	}

	// Making the client!
	client := gothreatmatrix.NewThreatMatrixClient(
		&clientOptions,
		nil,
		loggerParams,
	)

	ctx := context.Background()

	basicAnalysisParams := gothreatmatrix.BasicAnalysisParams{
		User:                 1,
		Tlp:                  gothreatmatrix.WHITE,
		RuntimeConfiguration: map[string]interface{}{},
		AnalyzersRequested:   []string{},
		ConnectorsRequested:  []string{},
		TagsLabels:           []string{},
	}

	observableAnalysisParams := gothreatmatrix.ObservableAnalysisParams{
		BasicAnalysisParams:      basicAnalysisParams,
		ObservableName:           "192.168.69.42",
		ObservableClassification: "ip",
	}

	analyzerResponse, err := client.CreateObservableAnalysis(ctx, &observableAnalysisParams)
	if err != nil {
		fmt.Println("err")
		fmt.Println(err)
	} else {
		analyzerResponseJSON, _ := json.Marshal(analyzerResponse)
		fmt.Println("JOB ID")
		fmt.Println(analyzerResponse.JobID)
		fmt.Println("JOB ID END")
		fmt.Println("========== ANALYZER RESPONSE ==========")
		fmt.Println(string(analyzerResponseJSON))
		fmt.Println("========== ANALYZER RESPONSE END ==========")
	}
}
