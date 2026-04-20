using backend_presentation_llm.Dtos;

namespace backend_presentation_llm.Services;

public interface IAiService
{
    Task<string> GenerateMessageAsync(List<CalendarEventDto> events);
}
