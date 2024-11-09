import React from "react";

interface entryProps {
  [key: string]: any
}

export default function Entry({ entry }: entryProps) {
  // Since we cannot directly map over the object, we grab the keys array and map over that
  const entryKeys = Object.keys(entry);

  return (
    <div className="rounded p-2 m-2 bg-gray-900">
      <pre>
        <code>
          {entryKeys.map((key: string, index: number) => (
            <>
              <p>
                <span className="text-amber-500">{key}:</span> <span className="text-lime-500">{entry[key]}</span>
              </p>
            </>
          ))}
        </code>
      </pre>
    </div>
  );
}
