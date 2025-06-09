import React, { useState, useEffect } from 'react'
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Box,
  Paper,
  Grid,
  Fade,
  Zoom,
  alpha,
  useMediaQuery
} from '@mui/material'

import ImageUploader from './ImageUploader'
import AllergyFilter from './AllergyFilter'
import ResultCard from './ResultCard'
import theme from '../theme'  
import { extractTextFromImage, analyzeIngredients } from '../services/ImageAnalysisService'
import { fetchUserAllergies } from '../services/userService'; 

const OcrScanner = () => {
  // const [selectedAllergies, setSelectedAllergies] = useState([])
  const [userAllergies, setUserAllergies] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [appReady, setAppReady] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // useEffect(() => {
  //   const timer = setTimeout(() => setAppReady(true), 100)
  //   return () => clearTimeout(timer)
  // }, [])

  useEffect(() => {
    
    const timer = setTimeout(() => setAppReady(true), 100);
  
   
    const fetchAllergies = async () => {
      try {
        const email = localStorage.getItem('email'); 
        if (!email) {
          console.error("No email found in localStorage");
          return;
        }
        const allergies = await fetchUserAllergies(email);
        setUserAllergies(allergies);
      } catch (error) {
        console.error("Failed to fetch allergies:", error);
        setError("Failed to load your allergy profile");
      }
    };
  
    fetchAllergies();
    return () => clearTimeout(timer);
  }, []);

  const handleImageSelected = async (imageData) => {
    setLoading(true)
    setError('')
    setAnalysisResult(null)
    try {
      const extractedText = await extractTextFromImage(imageData)
      if (!extractedText || extractedText.trim().length < 10) {
        throw new Error('Could not detect enough text in the image.')
      }

      if (!looksLikeIngredientsList(extractedText)) {
        throw new Error('This does not appear to be an ingredients list.')
      }

      // const result = await analyzeIngredients(extractedText, selectedAllergies)
      const result = await analyzeIngredients(extractedText, userAllergies); 
      setAnalysisResult(result)
    } catch (err) {
      setError(err.message || 'Failed to analyze image.')
    } finally {
      setLoading(false)
    }
  }

  const looksLikeIngredientsList = (text) => {
    const lowercase = text.toLowerCase()
    const hasIngredientsWord = lowercase.includes('ingredients')
    const hasCommas = (text.match(/,/g) || []).length >= 2
    const hasCommonIngredients = [
      'water', 'sugar', 'salt', 'flour', 'oil', 'milk', 'soy', 'wheat',
      'corn', 'extract', 'flavor', 'vitamin', 'acid', 'sodium', 'protein'
    ].some(word => lowercase.includes(word))
    const hasENumbers = /e\d{3}|e-\d{3}/i.test(lowercase)

    let score = 0
    if (hasIngredientsWord) score += 2
    if (hasCommas) score += 2
    if (hasCommonIngredients) score += 3
    if (hasENumbers) score += 2
    return score >= 3
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Box sx={{ minHeight: '100vh', pb: isMobile ? 8 : 6 }}> */}
      
      <Box
  sx={{
    minHeight: '100vh',
    pb: isMobile ? 8 : 6,
    backgroundColor: theme.palette.background.default,
    pt: { xs: 10, sm: 12 }, // add top padding to fix spacing below navbar
  }}
>

        <Fade in={appReady} timeout={800}>
         
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* <Header /> */}
            {/* <h1>OCR SCANNER</h1> */}
            
            {/* <Container maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 2, md: 4 } }}> */}
            <Container maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }}>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Zoom in={appReady} timeout={500}>
                    <Paper sx={{ p: 0, height: '100%', borderRadius: 3 }}>
                      {/* <AllergyFilter 
                        selectedAllergies={selectedAllergies}
                        setSelectedAllergies={setSelectedAllergies}
                      /> */}
                      <AllergyFilter userAllergies={userAllergies} /> 
                    </Paper>
                  </Zoom>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Zoom in={appReady} timeout={700}>
                    <Paper sx={{ p: 0, borderRadius: 3 }}>
                      <Box sx={{ p: 3 }}>
                        <ImageUploader 
                          onImageSelected={handleImageSelected}
                          loading={loading}
                        />
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              </Grid>

              {error && (
                <Fade in timeout={600}>
                  <Paper sx={{
                    p: 2.5, mt: 3, borderRadius: 2,
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                    borderLeft: '4px solid',
                    borderColor: theme.palette.error.main
                  }}>
                    {error}
                  </Paper>
                </Fade>
              )}

              {analysisResult && (
                <Fade in timeout={800}>
                  <Box mt={3}>
                    <ResultCard result={analysisResult} />
                  </Box>
                </Fade>
              )}
            </Container>
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  )
}

export default OcrScanner