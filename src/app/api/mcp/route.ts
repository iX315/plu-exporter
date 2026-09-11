import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js"
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod"
import { getMenuData } from "@/models/Menu"

const getServer = () => {
  const server = new McpServer({ name: "plu-exporter", version: "1.0.0" })

  server.registerTool(
    "get_menu",
    {
      title: "Get Menu",
      description:
        "Returns the restaurant menu (groups and their products) sourced from Google Sheets, same data as GET /api/data. Optionally filter by language.",
      inputSchema: {
        language: z
          .string()
          .optional()
          .describe("Language code to filter the menu by (e.g. 'en'). Omit to return all languages."),
      },
    },
    async ({ language }): Promise<CallToolResult> => {
      const values = await getMenuData(language)
      return { content: [{ type: "text", text: JSON.stringify({ values }) }] }
    },
  )

  return server
}

// Stateless: the SDK forbids reusing a transport across requests, so a fresh
// McpServer + transport pair is created per request. No session state to
// persist -- this tool is a pure read, matching /api/data.
const handleMcpRequest = async (request: Request) => {
  const server = getServer()
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })
  await server.connect(transport)
  return transport.handleRequest(request)
}

export const GET = handleMcpRequest
export const POST = handleMcpRequest
export const DELETE = handleMcpRequest
