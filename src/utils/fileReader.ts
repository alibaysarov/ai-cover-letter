export const readPDFFile = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer
        // Dynamic import to avoid TypeScript issues
        const pdfParse = (await import('pdf-parse')) as any
        const data = await pdfParse(new Uint8Array(arrayBuffer))
        resolve(data.text)
      } catch (error) {
        reject(new Error('Не удалось прочитать PDF файл'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Ошибка чтения файла'))
    }

    reader.readAsArrayBuffer(file)
  })
}

export const readTextFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const text = event.target?.result as string
      resolve(text)
    }

    reader.onerror = () => {
      reject(new Error('Ошибка чтения файла'))
    }

    reader.readAsText(file)
  })
}

export const readFileContent = async (file: File): Promise<string> => {
  const fileType = file.type

  if (fileType === 'application/pdf') {
    return await readPDFFile(file)
  } else if (
    fileType === 'application/msword' ||
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType === 'text/plain'
  ) {
    return await readTextFile(file)
  } else {
    throw new Error('Неподдерживаемый тип файла')
  }
}
