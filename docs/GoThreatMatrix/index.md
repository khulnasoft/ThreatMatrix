:fontawesome-brands-github: [Go-ThreatMatrix Repository](https://github.com/khulnasoft/go-threatmatrix)

# go-threatmatrix

[![GitHub issues](https://img.shields.io/github/issues/khulnasoft/go-threatmatrix?style=plastic)](https://github.com/khulnasoft/go-threatmatrix/issues)
[![GitHub license](https://img.shields.io/github/license/khulnasoft/go-threatmatrix?style=plastic)](https://github.com/khulnasoft/go-threatmatrix/blob/main/LICENSE)

![go-banner](./Banner.png)
go-threatmatrix is a client library/SDK that allows developers to easily automate and integrate [ThreatMatrix](https://github.com/khulnasoft/ThreatMatrix) with their own set of tools!

<!-- omit in toc -->

# Table of Contents

- [go-threatmatrix](#go-threatmatrix)
- [Getting Started](#getting-started)
  - [Pre requisites](#pre-requisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Examples](#examples)
- [Contribute](#contribute)
- [License](#liscence)
- [Links](#links)
- [FAQ](#faq)
  - [Generate API key](#generate-api-key)
    - [v4.0 and above](#v40-and-above)
    - [v4.0 below](#v40-below)

# Getting Started

## Pre requisites

- Go 1.17+

## Installation

Use go get to retrieve the SDK to add it to your GOPATH workspace, or project's Go module dependencies.

```bash
$ go get github.com/khulnasoft/go-threatmatrix
```

## Usage

This library was built with ease of use in mind! Here are some quick examples to get you started. If you need more example you can go to the [examples directory](./examples/)

To start using the go-threatmatrix library you first need to import it:

```
import "github.com/khulnasoft/go-threatmatrix/gothreatmatrix"
```

Construct a new `ThreatMatrixClient`, then use the various services to easily access different parts of threatmatrix's REST API. Here's an example of getting all jobs:

```Go
clientOptions := gothreatmatrix.ThreatMatrixClientOptions{
	Url:         "your-cool-URL-goes-here",
	Token:       "your-super-secret-token-goes-here",
	// This is optional
	Certificate: "your-optional-certificate-goes-here",
}

threatmatrix := gothreatmatrix.NewThreatMatrixClient(
	&clientOptions,
	nil
)

ctx := context.Background()

// returns *[]Jobs or an ThreatMatrixError!
jobs, err := threatmatrix.JobService.List(ctx)
```

For easy configuration and set up we opted for `options` structs. Where we can customize the client API or service endpoint to our liking! For more information go [here](). Here's a quick example!

```Go
// ...Making the client and context!

tagOptions = gothreatmatrix.TagParams{
  Label: "NEW TAG",
  Color: "#ffb703",
}

createdTag, err := threatmatrix.TagService.Create(ctx, tagOptions)
if err != nil {
	fmt.Println(err)
} else {
	fmt.Println(createdTag)
}
```

## Examples

The [examples](./examples/) directory contains a couple for clear examples, of which one is partially listed here as well:

```Go
package main

import (
	"fmt"

	"github.com/khulnasoft/go-threatmatrix/gothreatmatrix"
)

func main(){
	threatmatrixOptions := gothreatmatrix.ThreatMatrixClientOptions{
		Url:         "your-cool-url-goes-here",
		Token:       "your-super-secret-token-goes-here",
		Certificate: "your-optional-certificate-goes-here",
	}

	client := gothreatmatrix.NewThreatMatrixClient(
		&threatmatrixOptions,
		nil,
	)

	ctx := context.Background()

	// Get User details!
	user, err := client.UserService.Access(ctx)
	if err != nil {
		fmt.Println("err")
		fmt.Println(err)
	} else {
		fmt.Println("USER Details")
		fmt.Println(*user)
	}
}

```

For complete usage of go-threatmatrix, see the full [package docs](https://pkg.go.dev/github.com/khulnasoft/go-threatmatrix).

# Contribute

If you want to follow the updates, discuss, contribute, or just chat then please join our [slack](https://honeynetpublic.slack.com/archives/C01KVGMAKL6) channel we'd love to hear your feedback!

# License

Licensed under the GNU AFFERO GENERAL PUBLIC LICENSE.

# Links

- [threatmatrix](https://github.com/khulnasoft/ThreatMatrix)
- [Documentation](https://threatmatrix.readthedocs.io/en/latest/)
- [API documentation](https://khulnasoft.github.io/docs/ThreatMatrix/api_docs)
- [Examples](./examples/)

# FAQ

## Generate API key

You need a valid API key to interact with the ThreatMatrix server.

### v4.0 and above

You can get an API by doing the following:

1. Log / Signin into threatmatrix
2. At the upper right click on your profile from the drop down select `API Access/ Sessions`
3. Then generate an API key or see it!

### v4.0 below

Keys should be created from the admin interface of [ThreatMatrix](https://github.com/khulnasoft/threatmatrix): you have to go in the _Durin_ section (click on `Auth tokens`) and generate a key there.
