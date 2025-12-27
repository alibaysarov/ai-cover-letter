import React, { useState } from 'react'
import {
  VStack,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  Box,
  InputGroup,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react'
import { readFileContent } from '../utils/fileReader'
import { UrlTabData } from '../types'

interface UrlTabProps {
  onGenerate: (data: UrlTabData) => void
  isGenerating: boolean
}

export const UrlTab: React.FC<UrlTabProps> = ({ onGenerate, isGenerating }) => {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: 'Неверный тип файла',
          description: 'Пожалуйста, выберите PDF или DOC/DOCX файл.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const handleGenerate = async () => {
    if (!url.trim()) {
      toast({
        title: 'Введите URL',
        description: 'Пожалуйста, введите URL вакансии.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      let resumeContent: string | undefined

      if (file) {
        // Read file content
        resumeContent = await readFileContent(file)
      }

      onGenerate({
        type: 'url',
        url: url.trim(),
        resumeContent,
      })
    } catch (error) {
      toast({
        title: 'Ошибка чтения файла',
        description: error instanceof Error ? error.message : 'Не удалось прочитать файл резюме.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack spacing={6} align="stretch">
      <FormControl>
        <FormLabel fontSize="lg" fontWeight="semibold">
          URL вакансии
        </FormLabel>
        <InputGroup size="lg">
          <InputLeftAddon>https://</InputLeftAddon>
          <Input
            placeholder="hh.ru/vacancy/123456 или другой сайт вакансий"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            size="lg"
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel fontSize="lg" fontWeight="semibold">
          Резюме (опционально)
        </FormLabel>
        <Box>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="resume-file"
          />
          <label htmlFor="resume-file">
            <Button as="span" variant="outline" cursor="pointer" w="full">
              {file ? file.name : 'Выберите файл резюме'}
            </Button>
          </label>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Поддерживаемые форматы: PDF, DOC, DOCX
          </Text>
        </Box>
      </FormControl>

      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleGenerate}
        isLoading={isGenerating}
        loadingText="Генерация..."
        w="full"
      >
        Сгенерировать сопроводительное письмо
      </Button>
    </VStack>
  )
}
