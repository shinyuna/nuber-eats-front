export const s3ImageUpload = async (file: FileList, userId: string, fileType: string) => {
  const actualFile = file[0];
  const formBody = new FormData();
  formBody.append('file', actualFile);
  formBody.append('ownerId', userId);
  formBody.append('type', fileType);
  const { url } = await (
    await fetch('http://localhost:5000/uploads/', {
      method: 'POST',
      body: formBody,
    })
  ).json();
  return url;
};
