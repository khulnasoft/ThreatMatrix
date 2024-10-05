package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/khulnasoft/go-threatmatrix/gothreatmatrix"
	"github.com/sirupsen/logrus"
)

/*
For this example I'll be using the tag params!
*/
func main() {

	// Configuring the ThreatMatrixClient!
	clientOptions := gothreatmatrix.ThreatMatrixClientOptions{
		Url:         "PUT-YOUR-THREATMATRIX-INSTANCE-URL-HERE",
		Token:       "PUT-YOUR-TOKEN-HERE",
		Certificate: "",
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

	// making the tag parameters!
	tagParams := gothreatmatrix.TagParams{
		Label: "your super duper cool tag label!",
		Color: "#ffb703",
	}
	createdTag, err := client.TagService.Create(ctx, &tagParams)
	if err != nil {
		fmt.Println(err)
	} else {
		tagJson, err := json.Marshal(createdTag)
		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Println(string(tagJson))
		}
	}

}
