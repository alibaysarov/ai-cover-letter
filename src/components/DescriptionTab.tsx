import React, { useState } from 'react'
import {
  VStack,
  Input,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react'
import { DescriptionTabData } from '../types'

interface DescriptionTabProps {
  onGenerate: (data: DescriptionTabData) => void
  isGenerating: boolean
}

export const DescriptionTab: React.FC<DescriptionTabProps> = ({ onGenerate, isGenerating }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const toast = useToast()

  const handleGenerate = () => {
    if (!title.trim()) {
      toast({
        title: 'Введите название вакансии',
        description: 'Пожалуйста, введите название вакансии.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (!description.trim()) {
      toast({
        title: 'Введите описание вакансии',
        description: 'Пожалуйста, введите описание вакансии.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    onGenerate({
      type: 'description',
      title: title.trim(),
      description: description.trim(),
    })
  }

  return (
    <VStack spacing={6} align="stretch">
      <FormControl>
        <FormLabel fontSize="lg" fontWeight="semibold">
          Название вакансии
        </FormLabel>
        <Input
          placeholder="Например: Frontend разработчик React"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="lg"
        />
      </FormControl>

      <FormControl>
        <FormLabel fontSize="lg" fontWeight="semibold">
          Описание вакансии
        </FormLabel>
        <Textarea
          placeholder="Вставьте описание вакансии из HH.ru, LinkedIn или другого источника..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="lg"
          minHeight="200px"
          resize="vertical"
        />
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
