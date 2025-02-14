I'm thinking of a basic chat-app backend written in Golang. To start off, testing in Go seems to be most widely done with the `go test` command using the offical testing package, so we would go this route as well.

There are multiple possible linters I found for Go. From what I understand, we could use `golangci-lint` to run multiple linters like `staticcheck` and `govet`. 

Building in go happens with the `go build` command included with the go compiler, so we use that. We could use goReleaser for automatic building for different platforms and archiving builds. We could then make a docker container from this.

We could use Travis CI to manage the CI/CD pipeline. It is well documented and supports Go. Travis CI is a cloud platform and should work well for this kinda project. We could trigger Travis CI on a git commit, and setup github to take care of linting before the code is even in github. Travis CI can take the app from there all the way to deployment.

This setup is better in the cloud and a simple backend app does not really have any reason not to be. Travis CI is a cloud tool and as far as I'm aware it can't even be ran locally. The pipeline creates Docker containers that can be ran from anywhere.