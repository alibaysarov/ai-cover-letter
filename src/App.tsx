import { useState } from 'react'
import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  VStack,
  useToast,
  Text,
  Button
} from '@chakra-ui/react'
import { UrlTab } from './components/UrlTab'
import { DescriptionTab } from './components/DescriptionTab'
import { generateCoverLetter } from './utils/openai'
import { CoverLetterRequest } from './types'

function App() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState<string>('')
  const toast = useToast()

  const handleGenerate = async (data: CoverLetterRequest) => {
    setIsGenerating(true)
    setGeneratedLetter('')

    try {
      const coverLetter = await generateCoverLetter(data)

      setGeneratedLetter(coverLetter)

      toast({
        title: 'Сопроводительное письмо сгенерировано!',
        description: 'Вы можете скачать или скопировать готовое письмо.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Generation error:', error)
      toast({
        title: 'Ошибка генерации',
        description: error instanceof Error ? error.message : 'Произошла ошибка при генерации сопроводительного письма.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedLetter) return

    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'cover-letter.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    if (!generatedLetter) return

    try {
      await navigator.clipboard.writeText(generatedLetter)
      toast({
        title: 'Скопировано!',
        description: 'Сопроводительное письмо скопировано в буфер обмена.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Ошибка копирования',
        description: 'Не удалось скопировать текст.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

 

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" textAlign="center">
          Генератор сопроводительных писем
        </Heading>

       

        <Box w="full">
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>URL</Tab>
              <Tab>Описание</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <UrlTab onGenerate={handleGenerate} isGenerating={isGenerating} />
              </TabPanel>

              <TabPanel>
                <DescriptionTab onGenerate={handleGenerate} isGenerating={isGenerating} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {generatedLetter && (
          <Box w="full" p={6} borderWidth={1} borderRadius="lg" bg="gray.50">
            <Heading as="h3" size="md" mb={4}>
              Сгенерированное сопроводительное письмо:
            </Heading>
            <Text whiteSpace="pre-wrap" mb={4} fontSize="sm" lineHeight="tall">
              {generatedLetter}
            </Text>
            <VStack spacing={2}>
              <Button colorScheme="green" onClick={handleDownload} w="full">
                Скачать как файл
              </Button>
              <Button variant="outline" onClick={handleCopy} w="full">
                Копировать в буфер
              </Button>
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default App
