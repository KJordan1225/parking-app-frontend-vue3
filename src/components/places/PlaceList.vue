<template>
    <div class="row my-4">
        <PlaceListItem
            v-for="place in data.places"
            :key="place.id"
            :place="place"
			@updated-place="updatePlaceInList"
        />
    </div>
</template>

<script setup>
import {onMounted, reactive } from "vue";
import axios from "axios"
import PlaceListItem from './PlaceListItem.vue'

//define the data object
const data = reactive({
	places: []
})

//fetch all the places
const fetchPlaces = async () => {
	try {
		const response = await axios.get('http://127.0.0.1:8000/api/places')
		data.places = response.data.data
		console.log(response.data.data)
	} catch (error) {
		console.log(error)
	}
}

//update place in places list
const updatePlaceInList = (updatedPlace) => {
	const index = data.places.findIndex(p => p.id === updatedPlace.id)
	if (index !== -1) {
		data.places[index] = updatedPlace
	}
}

//once the component is mounted we fetch the places
onMounted (() => fetchPlaces())
</script>

<style scoped>

</style>