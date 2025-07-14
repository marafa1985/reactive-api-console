import { HighlightText } from "@/components/atoms";
import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";

type WeatherProps = {
  response: ApiResponse;
  searchTerm: string;
  hasMatches: boolean;
  matches: HighlightMatch[];
};

export const Weather = ({
  response,
  searchTerm,
  hasMatches,
  matches,
}: WeatherProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-lg">
        <HighlightText
          text={response.data.current_weather.city}
          searchTerm={searchTerm}
        />
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Temperature:</span>
          <p className="font-medium">
            <HighlightText
              text={`${response.data.current_weather.temperature}°C`}
              searchTerm={searchTerm}
            />
          </p>
        </div>
        <div>
          <span className="text-gray-600">Wind Speed:</span>
          <p className="font-medium">
            <HighlightText
              text={`${response.data.current_weather.windspeed} km/h`}
              searchTerm={searchTerm}
            />
          </p>
        </div>
      </div>
      {hasMatches && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🔍 {matches.length} match{matches.length !== 1 ? "es" : ""} found in
          weather data
        </div>
      )}
    </div>
  );
};
