<template>
	<div class="col-md-4">
		<div class="card custom-card mb-4">
			<div class="card-body">
				<h5 class="card-title">
					{{ place.place_number }}
					<span :class="`
                        badge
                        ${place.status === 'available' ? 'bg-success' : 'bg-danger'}
                        float-end `">
                        {{ place.status }}
                    </span>
				</h5>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <p class="card-text mb-1">
                            <strong>Sector:</strong> {{ place.sector.name }}
                            {{ place.sector.description }}
                        </p>
                        <p class="card-text mb-1">
                            <strong>Price:</strong> ${{ place.sector.price }} / hour
                        </p>
                    </div>
                    <div>
                        <i class="bi bi-p-circle h1"
                        v-if="place.status === 'available'"  
                        ></i>
                        <i class="bi bi-sign-no-parking h1"
                        v-else
                        ></i>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <button class="btn btn-sm btn-dark"
                    v-if="place.status === 'available'"
                    @click="reservePlace(place.id)"
                    >
                        Reserve
                    </button>
                    <template v-else-if="place.status === 'reserved'">
                        <button class="btn btn-sm btn-primary">
                            Park here
                        </button>
                        <button class="btn btn-sm btn-warning">
                            Cancel
                        </button>
                    </template>
                    <button class="btn btn-sm btn-danger"
                        v-else-if="place.status === 'occupied'"
                    >
                        End parking
                    </button>
                </div>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from "axios"


//define the props
const props = defineProps({
	place: {
		type: Object,
		required: true
	}
})

//define the event
const emit = defineEmits(['updated-place'])

// reserve a place
const reservePlace = async (placeId) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/book/reservation', {
            place_id: placeId,
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        emit('updated-place', response.data.place)
        console.log(response.data);
    } catch (error) {
        console.log('Status:', error.response?.status);
        console.log('Data:', error.response?.data);
        console.log('Full error:', error);
    }
}
</script>

<style scoped>

</style>