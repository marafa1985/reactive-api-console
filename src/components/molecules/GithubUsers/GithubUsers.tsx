import { HighlightText } from "@/components/atoms";
import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";

type GithubUsersProps = {
  response: ApiResponse;
  searchTerm: string;
  hasMatches: boolean;
  matches: HighlightMatch[];
};

export const GithubUsers = ({
  response,
  searchTerm,
  hasMatches,
  matches,
}: GithubUsersProps) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Found {response.data.total} users:
      </p>
      <div className="grid gap-2">
        {response.data.items
          .slice(0, 5)
          .map(
            (user: {
              id: string;
              avatar_url: string;
              login: string;
              type: string;
            }) => {
              const userMatches =
                searchTerm &&
                (user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.type.toLowerCase().includes(searchTerm.toLowerCase()));
              return (
                <div
                  key={user.id}
                  className={`flex items-center space-x-3 p-2 rounded ${
                    userMatches
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-gray-50"
                  }`}
                >
                  <img
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={user.login}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm">
                      <HighlightText
                        text={user.login}
                        searchTerm={searchTerm}
                      />
                    </p>
                    <p className="text-xs text-gray-500">
                      <HighlightText text={user.type} searchTerm={searchTerm} />
                    </p>
                  </div>
                </div>
              );
            }
          )}
      </div>
      {hasMatches && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🔍 {matches.length} match{matches.length !== 1 ? "es" : ""} found in
          user data
        </div>
      )}
    </div>
  );
};
