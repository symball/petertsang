<template>
  <!-- Intro -->
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <img src="./assets/pete-rock.jpeg" class="portrait-image">
          </div>
          <div class="column">
            <h1 class="title is-size-1">
              Peter Tsang
            </h1>
            <h2 class="subtitle is-size-3">
              The man who opened doors
            </h2>
            <button class="button" @click="modalTribute = true">Post a Tribute</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Submit a tribute-->
  <div class="modal" :class="{ 'is-active': modalTribute}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Upload a tribute</p>
        <button @click="modalTribute = false" aria-label="close">
          <font-awesome-icon icon="window-close" />
        </button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Your Name">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Title of Tribute">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Caption / Text">
          </div>
        </div>
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Upload a Picture
              </span>
            </span>
          </label>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Submit</button>
        <button @click="modalTribute = false" class="button">Cancel</button>
      </footer>
    </div>
  </div>
  <!-- Image Popup -->
  <div class="modal" :class="{ 'is-active': modalImage}">
    <div @click="modalImage = false" class="modal-background"></div>
    <div v-if="contextImage" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ contextImage.title }}</p>
        <button @click="modalImage = false" aria-label="close">
          <font-awesome-icon icon="window-close" />
        </button>
      </header>
      <section class="modal-card-body">
        <h3 v-if="contextImage.author">Uploaded by {{ contextImage.author }}</h3>
        <p v-if="contextImage.caption">{{ contextImage.caption }}</p>
        <img :src="`${imageBase}large/${contextImage.name}`" class="modal-image" />
        <div class="buttons has-addons is-centered">
          <button class="button" @click="previousImage">&larr;</button>
          <button class="button" @click="nextImage">&rarr;</button>
        </div>
      </section>
    </div>
  </div>
  <!-- Timeline -->
  <section class="section">
    <div class="container">
      <article class="message is-dark">
        <div class="message-header">
          <p>Timeline</p>
        </div>
        <div class="message-body">
          <ul>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>1987</strong> - Born in Hong Kong at Gleneagles HK Hospital</li>
            <li><strong>2020</strong> - At the age of 34, Peter died of in his Sheung Wan flat</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
  <!-- Writing carousel -->
  <section class="section">
    <carousel :itemsToShow="postsToShow">
      <slide v-for="(post, postIndex) in posts" :key="postIndex">
        <div class="card">
          <header class="card-header has-text-centered">
            <p class="card-header-title">
              {{ post.author }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              {{ post.text }}
            </div>
          </div>
        </div>
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </section>
  <!-- Gallery -->
  <section class="section">
    <div id="grid">
      <div
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        class="grid-item"
      >

        <img
          :src="`${imageBase}small/${image.name}`"
          :alt="`${image.title}`"
          @click="showImage(image, imageIndex)"
        />
      </div>
    </div>
  </section>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>RIP Peter Tsang</strong> from many who cared for you. May your flame burn on eternally
      </p>
    </div>
  </footer>
</template>

<script>
import Macy from 'macy';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { imageBaseUrl } from '@/utils/config.js';

export default {
  name: 'App',
  components: {
    Carousel,
    Pagination,
    Navigation,
    Slide
  },
  data() {
    return {
      modalImage: false,
      modalTribute: false,
      contextImage: null,
      contextImageIndex: null,
      imageCount: 0,
      images: [
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '1.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '2.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '3.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '4.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '5.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '6.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '7.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '8.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '9.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '10.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '11.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '12.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '13.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '14.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '15.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '16.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '17.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '18.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '19.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '20.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '21.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '22.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '23.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '24.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '25.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '26.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '27.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '28.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '29.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '30.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '31.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '32.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '33.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '34.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '35.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '36.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '37.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '38.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '39.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '40.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '41.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '42.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '43.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '44.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '45.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '46.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '47.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '48.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '49.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '50.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '51.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '52.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '53.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '54.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '55.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '56.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '57.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '58.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '59.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '60.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '61.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '62.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '63.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '64.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '65.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '66.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '67.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '68.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '69.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '70.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '71.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '72.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '73.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '74.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '75.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '76.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '77.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '78.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '79.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '80.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '81.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '82.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '83.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '84.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '85.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '86.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '87.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '88.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '89.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '90.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '91.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '92.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '93.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '94.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '95.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '96.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '97.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '98.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '99.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '100.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '101.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '102.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '103.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '104.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '105.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '106.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '107.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '108.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '109.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '110.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '111.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '112.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '113.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '114.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '115.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '116.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '117.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '118.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '119.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '120.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '121.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '122.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '123.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '124.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '125.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '126.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '127.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '128.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '129.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '130.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '131.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '132.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '133.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '134.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '135.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '136.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '137.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '138.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '139.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '140.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '141.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '142.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '143.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '144.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '145.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '146.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '147.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '148.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '149.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '150.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '151.jpeg' },
        { author: 'John Smith', title: 'lorem ipsum', caption: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.', name: '152.jpeg' },
      ],
      posts: [
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        { author: 'John Smith', text: 'ulla luctus pretium orci quis euismod. Nam luctus egestas feugiat. Cras non vehicula velit.' },
        
      ]
    }
  },
  computed: {
    imageBase() { return imageBaseUrl; },
    postsToShow() {
      if(window.innerWidth <= 500 ) return 1;
      if(window.innerWidth <= 700 ) return 2;
      if(window.innerWidth <= 1100 ) return 3;
      return 4;
    },
  },
  created() {
    this.imageCount = this.images.length;
  },
  mounted() {
     const macy = new Macy({
            container: '#grid',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: {
                y: 16,
                x: '2%',
            },
            breakAt: {
                1200: 6,
                940: 5,
                520: 3,
                400: 2
            },
        });
        console.log(macy)
  },
  methods: {
    previousImage() {
      if(this.contextImageIndex === 0) return;
      this.contextImageIndex -= 1;
      this.contextImage = this.images[this.contextImageIndex];
    },
    nextImage() {
      if(this.contextImageIndex === this.imageCount) return;
      this.contextImageIndex += 1;
      this.contextImage = this.images[this.contextImageIndex];
    },
    showImage(image, imageIndex) {
      this.contextImage = image;
      this.contextImageIndex = imageIndex;
      this.modalImage = true;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* Tweak size of header image */
.portrait-image {
  height: 350px;
}
.grid { width: 100%;}
.grid-item { padding: 1rem; }

.modal-image { max-height: 80vh; }
</style>
