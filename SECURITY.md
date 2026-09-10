# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| latest minor on npm | yes |
| older versions | no, please upgrade |

## Reporting a vulnerability

Please do not open a public issue for security problems.

Use GitHub's private reporting: **Security → Report a vulnerability** on
https://github.com/auronsan/react-native-mantine, or email the maintainer at
the address on https://github.com/auronsan.

You will get an acknowledgement within 72 hours. Fixes for confirmed issues
are released as a patch version and noted in the changelog and GitHub release.

## Dependencies

react-native-mantine has no runtime dependencies. Native integrations
(icons, gradients, clipboard, document picker, fonts) are optional peer
dependencies that you choose and install yourself. Dependabot alerts are
enabled on the repository and transitive advisories in the development
toolchain are pinned via `resolutions` in `package.json`.
