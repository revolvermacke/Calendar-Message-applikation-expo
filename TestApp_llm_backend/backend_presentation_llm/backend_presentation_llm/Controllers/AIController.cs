using backend_presentation_llm.Dtos;
using backend_presentation_llm.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_presentation_llm.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AIController(IAiService aiService) : ControllerBase
{
    private readonly IAiService _aiService = aiService;

    [HttpPost("generate-meesage")]
    public async Task<IActionResult> GenerateMessage([FromBody] GenerateMessageRequest req)
    {
        var message = await _aiService.GenerateMessageAsync(req.Events);

        return Ok(message);
    }
}
