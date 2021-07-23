import React, { useRef } from "react";

import { DOMAIN } from "../../constants";

interface IUploadButton {
  onUploading: () => any;
  onUploadSuccess: () => any;
  onUploadError: (error: string) => any;
}

export default function UploadButton({
  onUploading,
  onUploadSuccess,
  onUploadError,
}: IUploadButton): JSX.Element {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  function handleOnClick() {
    hiddenFileInput.current?.click();
  }

  async function handleOnChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const form = new FormData();
      form.append("file", file, file.name);
      onUploading();
      const resp = await fetch(`${DOMAIN}/payrolls/upload`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (data.error) {
        onUploadError(data.message);
      } else {
        onUploadSuccess();
      }
    }
  }

  return (
    <div>
      <button onClick={handleOnClick}>Upload a file</button>
      <input
        ref={hiddenFileInput}
        onChange={handleOnChange}
        type="file"
        style={{ display: "none" }}
      />
    </div>
  );
}
