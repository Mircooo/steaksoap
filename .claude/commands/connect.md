# /connect

Install and configure a MCP server for Claude Code.

## Arguments
$ARGUMENTS — Name or description of the MCP server to connect.

## Steps

1. Search `registry/mcp-servers.json` for the server matching $ARGUMENTS
   Match by id, name, or category.

2. If found, show the user:
   - Server name and description
   - Required environment variables (if any)
   - Install command

3. Ask the user to confirm and provide any required env vars.

4. Run the install command:
   ```bash
   [install command from registry]
   ```

5. Verify the server is connected:
   ```bash
   claude mcp list
   ```

6. Report success or failure.

## If not found
If no server matches $ARGUMENTS, suggest:
- Check `registry/mcp-servers.json` for available servers
- Search https://github.com/modelcontextprotocol/servers for more options
- Or build a custom MCP server with the MCP SDK

## Rules
- ALWAYS ask for confirmation before installing
- NEVER store API keys or tokens in code — use --env flags
- If the server requires env vars, help the user set them up
