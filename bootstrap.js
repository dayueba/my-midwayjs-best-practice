const process = require('process');
const { NodeSDK, resources } = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { JaegerPropagator } = require('@opentelemetry/propagator-jaeger');

const { Bootstrap } = require('@midwayjs/bootstrap');

const tracerAgentHost = process.env['TRACER_AGENT_HOST'] || '127.0.0.1';

const jaegerExporter = new JaegerExporter({
  tags: [], // optional
  endpoint: `http://${tracerAgentHost}:14268/api/traces`,
  maxPacketSize: 65000, // optional
});

const sdk = new NodeSDK({
  resource: new resources.Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-app',
  }),
  // traceExporter: new node.ConsoleSpanExporter(),
  traceExporter: jaegerExporter,
  textMapPropagator: new JaegerPropagator(),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch(error => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

Bootstrap.configure(/**/).run();
