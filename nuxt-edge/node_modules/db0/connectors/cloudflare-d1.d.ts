import type { Connector } from "../types";
export interface ConnectorOptions {
    bindingName?: string;
}
export default function sqliteConnector(options: ConnectorOptions): Connector;
