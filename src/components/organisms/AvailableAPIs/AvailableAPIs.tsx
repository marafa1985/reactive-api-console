import { Commands } from "../../molecules/Commands/Commands";
import { activeApis$, selectApisState } from "@/store/feature/slices";
import { useAppSelector } from "@/store/hooks";

type AvailableAPIsProps = {
  onToggleApi: (apiId: string) => void;
} & React.HTMLAttributes<HTMLUListElement>;

export const AvailableAPIs = ({ onToggleApi, ...rest }: AvailableAPIsProps) => {
  const { apis } = useAppSelector(selectApisState);
  activeApis$.next(apis.filter((api) => api.isActive));

  const toggleApi = (apiId: string) => {
    onToggleApi(apiId);
  };

  return (
    <ul
      className="flex-1 overflow-y-auto p-2 flex flex-col gap-4"
      data-testid="api-list"
      {...rest}
    >
      {apis.map((api) => (
        <li
          key={api.id}
          data-testid={`api-list-item-${api.id}`}
          className={`card p-4 cursor-pointer transition-all duration-200 ${
            api.isActive
              ? "ring-2 ring-orange-500 bg-orange-50"
              : "hover:shadow-card-hover"
          }`}
          onClick={() => toggleApi(api.id)}
        >
          <header className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{api.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{api.description}</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                api.isActive ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          </header>

          {api.isActive && <Commands commands={api.commands} />}
        </li>
      ))}
    </ul>
  );
};
