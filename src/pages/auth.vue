<script setup lang="ts">
import axios from 'axios'
import fetcher from '../utils/fetcher'

function getToken() {
  const payload = {
    grant_type: 'authorization_code',
    client_id: 'cc51012d511d79c258eb1b04520e987e',
    client_secret: '846aae9e2918635d89a77a9089d0b552ac99f829c98f34d44373ca5e3e18f69a',
    code: 'c0b2b3b3-7b7b-4b3b-8b7b-7b7b7b7b7b7b',
    redirect_uri: 'https://flynncao.xyz/',
  }
  fetcher('https://myanimelist.net/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'xxx-form-urlencoded',
    },
    data: payload,

  }).then((res) => {
    console.log(res)
  })
  axios.get('https://api.myanimelist.net/v2/anime/season/2022/summer?sort=anime_num_list_users&limit=500',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVhYTliMzYwNmJiNjgzZjc4NDIxZmVjNzI4ZjljMGQ5NThiNDY3ODlkZTc2OTY4ZTI1NjhmMTkwNTQ4N2E3ZDUxMTBmODk5ZmEyYTA1ZGJhIn0.eyJhdWQiOiIxODA0MiIsImp0aSI6IjVhYTliMzYwNmJiNjgzZjc4NDIxZmVjNzI4ZjljMGQ5NThiNDY3ODlkZTc2OTY4ZTI1NjhmMTkwNTQ4N2E3ZDUxMTBmODk5ZmEyYTA1ZGJhIiwiaWF0IjoxNzEyNzM1MjkwLCJuYmYiOjE3MTI3MzUyOTAsImV4cCI6MTc0NDI3MTI5MCwic3ViIjoiNTg2NDk4MyIsInNjb3BlcyI6W119.GG2TDjAF7-lBo_CC8nGkBqQKnhg2XDp-KdkTV0ZLW_1xbi29uvByX7YbyzUeTlzAr5Kd9YlmQ80xULbCnmKK44syZpEMjMwELlC1hjThfToVCWvMeSvwSZ_wSsSnbziGh-pKNUcNWE_AzuLVO51K2-bzw2pleHBOXJOkL3E7ngfnu9WVhMStEpgFdhoO3NWweTKIFTMUx8JqrfRidlaKKzmQyOBtqoWA-rqeYfv4H-bqpSNc9gHNaDugdvhE5xzYz1nYTQ7jlo3BmGvCFcWQtXSfALiwAEed3xUy6xyOuuhpAWXLpSkyQ0e0t5E-l5VVpFWGjG5ymK0jp4yUZnUsVebNYeGgkGEUmOv_F8vo_CBCGLMUsdoxKUytUHneyypzIFirp3-8RQDhD_xLEcwSSxJAYG1H_fLOWkQ50BTL8imtGJrsvGDGFoUcYAawYZdaNWjFr6YLXanGY87K9fFUP8dR5Lipwtsdy8V1lrzvfRnQ1imZhuYXDCG9I9Cog9Sel5ejI1Ju2GxoSqAAxdBvL5Ky5fp8ivDI8TtWg70bKvxRGKRpOfN7czjKzXMYc89cvMsBBEzXsoMQMPpDQFnRhiTDlBqgWL1y0rQUYkqHfPVKSPk5YzBOw7_-OoLXMN6ITaQUI7hnrqODm0l4R3QGfRpwLNyXpFHBCIwVjJA3cDs',
      },
    },
  )
}
</script>

<template>
  <h1>
    Authorization Page
  </h1>
  <a href="https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=cc51012d511d79c258eb1b04520e987e&state=westwoodcao&code_challenge=X_UA1_ojH7Ij_bjVpUig69uQZfBbrTojW_Ueihsz14vs2zQtMGMTaBUjlH90D-53LIViFh1IucR0kOMBsX6cj2XAAeCQgkNVG1l6iEbytyg5D5lGkA&code_challenge_method=plain&redirect_uri=https://flynncao.xyz/" target="_blank">  <div class="btn" href="">
    Login with AniList
  </div></a>

  <a class="btn" @click="getToken">
    Get Auth2.0 Token
  </a>
</template>

<style>

</style>
