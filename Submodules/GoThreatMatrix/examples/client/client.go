package main

import (
	"context"

	"github.com/khulnasoft/go-threatmatrix/gothreatmatrix"
	"github.com/sirupsen/logrus"
)

func main() {
	/*
		Making a new client through NewThreatMatrixClient:
		This takes the following parameters:
			1. ThreatMatrixClientOptions
			2. A *http.Client (if you do not provide one. One will be made by default)
			3. LoggerParams
		These are parameters that allow you to easily configure your ThreatMatrixClient to your liking.
		For a better understanding you can read it in the documentation: https://github.com/khulnasoft/go-threatmatrix/tree/main/examples/optionalParams
	*/

	// Configuring the ThreatMatrixClient!
	clientOptions := gothreatmatrix.ThreatMatrixClientOptions{
		Url:         "PUT-YOUR-THREATMATRIX-INSTANCE-URL-HERE",
		Token:       "PUT-YOUR-TOKEN-HERE",
		Certificate: "",
		Timeout:     0,
	}

	// Configuring the logger
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

	tags, err := client.TagService.List(ctx)

	if err != nil {
		client.Logger.Logger.WithFields(logrus.Fields{
			"error": err.Error(),
		}).Error("An error occurred")
	} else {
		client.Logger.Logger.WithFields(logrus.Fields{
			"tags": *tags,
		}).Info("These are your tags")
	}

}
