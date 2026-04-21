using backend_presentation_llm.Dtos;
using OpenAI;
using OpenAI.Chat;
using System.Text;
using System.Text.Json;

namespace backend_presentation_llm.Services;

public class AiService : IAiService
{
    private readonly ChatClient _chatClient;

    public AiService(IConfiguration config)
    {
        var apiKey = config["OpenAI:ApiKey"];
        var client = new OpenAIClient(apiKey);
        _chatClient = client.GetChatClient("gpt-4o-mini");
    }
    public async Task<SummaryDto> GenerateMessageAsync(List<CalendarEventDto> events)
    {
        var prompt = BuildPrompt(events);

        var result = await CallLlm(prompt);
        return new SummaryDto { Summary = result };
    }

    private string BuildPrompt(List<CalendarEventDto> events)
    {
        var sb = new StringBuilder();

        foreach (var e in events)
        {
            sb.AppendLine($"Title: {e.Title}");
            sb.AppendLine($"Time: {e.Time}");
        }

        return sb.ToString();
    }

    private async Task<string> CallLlm(string prompt)
    {
        var messages = new ChatMessage[]
        {
            ChatMessage.CreateSystemMessage(
            @"You summarize calendar events.

            Rules:
            - Be concise (max 5 sentences)
            - Do not invent information
            - Have a friendly tone

            Return JSON:
            {
              ""summary"": string
            }"),
            ChatMessage.CreateUserMessage(prompt)
        };

        var options = new ChatCompletionOptions
        {
            Temperature = 0.2f
        };

        var response = await _chatClient.CompleteChatAsync(messages, options);

        var json = response.Value.Content.FirstOrDefault()?.Text ?? "";

        json = json.Replace("```json", "")
                   .Replace("```", "")
                   .Trim();
        try
        {
            var result = JsonSerializer.Deserialize<SummaryDto>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return result?.Summary ?? "";
        }
        catch
        {
            return "Could not generate summary.";
        }
    }
}