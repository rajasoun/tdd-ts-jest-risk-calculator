# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.187.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT} as base

COPY packages/*.* /tmp/packages-tmp/

# OS packages
FROM base as os-builder
RUN set -x \
    && apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends bash bash-completion \
       vim git netcat jq curl git-flow wget g++ zsh-autosuggestions \
       zsh-syntax-highlighting binutils libcurl4 zlib1g libdw1 shellcheck\
       python3-pip python3-setuptools \
    && apt-get autoremove -y  \
    && apt-get clean -y \
    && rm -r /var/cache/* /var/lib/apt/lists/*

# Install global node packages.
FROM os-builder as toolz-builder
RUN set -x \
    && su node -c "source /usr/local/share/nvm/nvm.sh && npm install -g husky commitizen commitlint" 2>&1
# taskctl
ENV TASKCTL_URL=https://raw.githubusercontent.com/taskctl/taskctl/master/install.sh
RUN set -x \
    && mkdir /tools \
    && curl -fsSL $TASKCTL_URL  | sh -s -- -b /tools
#github cli
ENV GH_VER=1.13.1

ENV GH_CLI=https://github.com/cli/cli/releases/download/v${GH_VER}/gh_${GH_VER}_linux_amd64.tar.gz
RUN set -ex \
    && wget -q $GH_CLI -O - | tar xz -C ./ --strip-components 1

#Python Packages
RUN set -ex \
    && pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/packages-tmp/requirements.txt

# shellspec, kcov and gh
FROM shellspec/shellspec-debian:kcov as shellspec-kov

# dev-container
FROM toolz-builder
COPY --from=shellspec-kov   /opt/shellspec              /opt/shellspec
COPY --from=shellspec-kov   /usr/local/bin/kcov*        /usr/local/bin/
COPY --from=shellspec-kov   /usr/local/share/doc/kcov   /usr/local/share/doc/kcov

# goss - Quick and Easy server validation
RUN set -ex \
    && curl -fsSL https://goss.rocks/install | sh

ENV PATH="/opt/shellspec:/tools:$PATH"
