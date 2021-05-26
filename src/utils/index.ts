/**
 * s3ImageUpload
 * @param file - file
 * @param userId - owner id
 * @param fileType - ex: restaurant_cover_img
 * @description 사용자가 업로드한 이미지를 s3에 업로드 후 해당 s3 파일 url을 반환해주는 함수
 * @returns s3 upload image url
 */
export const s3ImageUpload = async (file: FileList | string, userId: string, fileType: string) => {
  const formData = new FormData();
  const actualFile = file[0];

  formData.append('file', actualFile);
  formData.append('ownerId', userId);
  formData.append('type', fileType);

  const { url } = await (
    await fetch('http://localhost:5000/uploads/', {
      method: 'POST',
      body: formData,
    })
  ).json();

  return url;
};
