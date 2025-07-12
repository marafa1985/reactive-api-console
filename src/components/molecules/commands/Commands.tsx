type CommandsProps = {
  commands: string[];
};

export const Commands = ({ commands }: CommandsProps) => {
  return (
    <section className="mt-3 pt-3 border-t border-gray-200">
      <h4 className="text-xs font-medium text-gray-700 mb-2">Commands:</h4>
      <ol className="space-y-1">
        {commands.map((cmd, index) => (
          <li key={index} className="text-xs text-gray-600">
            <code className="bg-gray-100 px-1 py-0.5 rounded">{cmd}</code>
          </li>
        ))}
      </ol>
    </section>
  );
};
