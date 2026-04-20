using backend_presentation_llm.Dtos;

namespace backend_presentation_llm.Services;

public class AiService : IAiService
{
    public async Task<string> GenerateMessageAsync(List<CalendarEventDto> events)
    {
        var prompt = BuildPrompt(events);

        var response = await CallLlm(prompt);

        return response.ToString();
    }

    private string BuildPrompt(List<CalendarEventDto> events)
    {
        var prompt = "You are a helpful and kind assistant that summarizes calendar events. Here are the events:\n\n";
        foreach (var calendarEvent in events)
        {
            prompt += $"Title: {calendarEvent.Title}\n";
            prompt += $"Time: {calendarEvent.Time}\n";
        }
        prompt += "Please provide a summary of these events.";
        return prompt;
    }

    private async Task<string> CallLlm(string prompt)
    {
        // Simulate calling a language model API
        await Task.Delay(1000); // Simulate network delay
        return "This is a summary of the events.";
    }
}