/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    'use strict'
  
    const isValidTheme = theme => {
      return theme && ['auto', 'light', 'dark'].includes(theme)
    }

    const getThemeFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const themeParam = urlParams.get('theme')
      return isValidTheme(themeParam) ? themeParam : null
    }

    const getStoredTheme = () => {
      return localStorage.getItem('theme')
    }

    const setStoredTheme = theme => {
      if (isValidTheme(theme)) {
        localStorage.setItem('theme', theme)
      }
    }

    // Initialize theme from URL if present
    const urlTheme = getThemeFromUrl()
    if (urlTheme) {
      setStoredTheme(urlTheme)
    }

    const getPreferredTheme = () => {
      const urlTheme = getThemeFromUrl()
      if (urlTheme) {
        return urlTheme
      }
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
      return 'auto'
    }
  
    const setTheme = function (theme) {
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }
  
    setTheme(getPreferredTheme())
  
    const showActiveTheme = theme => {
      const activeThemeIcon = document.querySelector('#theme-icon-active');
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
      const checkToShow = document.querySelector(`#theme-selected-${theme}`)
      const svgOfActiveBtn = document.querySelector(`#theme-icon-${theme}`).innerHTML
      
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
      })

      document.querySelectorAll('.theme-selected-indicator').forEach(element => {
        element.classList.add('d-none')
      })
      
      btnToActive.classList.add('active')
      checkToShow.classList.remove('d-none')
      activeThemeIcon.innerHTML = svgOfActiveBtn
    }
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (storedTheme !== 'light' || storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme())
  
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
            showActiveTheme(theme)
          })
        })
    })
  })()