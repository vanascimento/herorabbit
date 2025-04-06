# Hero Rabbit

## Overview

This project is not officially supported by the original RabbitMQ developers. It was created to enhance the RabbitMQ Management Plugin by adding administrative tasks that are frequently performed in day-to-day operations while managing multiple RabbitMQ clusters.

<p align="center">
  <img src="image_example.png" alt="Exemplo de imagem" width="20%" height="20%" />
</p>
## Getting Started with Development Environment

### Prerequisites

After checking out the project, you will find three main folders in the repository:

1. **Playground**
   - This folder contains a `docker-compose` file that sets up a RabbitMQ cluster. You can start this container to test the extension’s execution.
2. **Scripts**
   - This folder contains scripts to simulate messages in queues, user connections, and channels. Feel free to enhance these scripts to cover additional use cases.
3. **Extension**
   - This folder contains the main project. To run it, execute the command `npm run build:watch`, then install the `dist` folder in Chrome using development mode.
   - If you make changes while the build command is running in watch mode, the extension will automatically update in real time (hot reload), reflecting your modifications immediately.

## Privacy Policy

This project respects user privacy and follows best practices to protect personal data. No data is collected externally. All data managed by this extension is stored exclusively in your Google Chrome local storage, ensuring that no information is leaked outside your organization.

### Data Collection

- This extension does not collect or transmit any user data.
- All stored data remains local to your browser.

### Security

- Data is securely stored within Google Chrome's local storage.
- No external servers or third parties have access to the stored data.

### User Rights

- Users can manage and delete stored data directly from their browser settings.

## Quality Gates

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=bugs)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=vanascimento_herorabbit&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=vanascimento_herorabbit)
