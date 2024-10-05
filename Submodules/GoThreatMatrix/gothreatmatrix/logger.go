package gothreatmatrix

import (
	"io"
	"os"

	"github.com/sirupsen/logrus"
)

// LoggerParams represents the fields to configure your logger.
type LoggerParams struct {
	File      io.Writer
	Formatter logrus.Formatter
	Level     logrus.Level
}

// ThreatMatrixLogger represents a logger to be used by the developer.
// ThreatMatrixLogger implements the Logrus logger.
//
// Logrus docs: https://github.com/sirupsen/logrus
type ThreatMatrixLogger struct {
	Logger *logrus.Logger
}

// Init initializes the ThreatMatrixLogger via LoggerParams
func (threatMatrixLogger *ThreatMatrixLogger) Init(loggerParams *LoggerParams) {
	logger := logrus.New()

	// Where to log the data!
	if loggerParams.File == nil {
		logger.SetOutput(os.Stdout)
	} else {
		logger.Out = loggerParams.File
	}

	if loggerParams.Formatter != nil {
		logger.SetFormatter(loggerParams.Formatter)
	}

	logger.SetLevel(loggerParams.Level)
	threatMatrixLogger.Logger = logger
}
