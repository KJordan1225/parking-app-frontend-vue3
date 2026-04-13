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
                        <button class="btn btn-sm btn-primary"
                        @click="startParking(place)"
                        >
                            Park here
                        </button>
                        <button class="btn btn-sm btn-warning"
                        @click="cancelReservation(place)"
                        >
                            Cancel
                        </button>
                    </template>
                    <button class="btn btn-sm btn-danger"
                        v-else-if="place.status === 'occupied'"
                        @click="endParking(place)"
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
import { useToast } from "vue-toastification"
import { handlePlaceRequest, reservePlaceApi } from "../../config/api"


//define the props
const props = defineProps({
	place: {
		type: Object,
		required: true
	}
})

//define the toast
const toast = useToast()

//define the event
const emit = defineEmits(['updated-place'])

// reserve a place
    const reservePlace = async (placeId) => {
        const resData = await handlePlaceRequest(() => reservePlaceApi(placeId))
        if(resData) {
                emit('updated-place', resData.place)
                toast.success(resData.message, {
                timeout: 4000
            }) 
        }
    }


// cancel a reservation
const cancelReservation = async (place) => {
    const reservation = findReservationByUser(place, 'reserved')

    if (!reservation) {
        toast.error('No reservation found for this user.', { timeout: 3000 })
        return
    }

    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/cancel/${reservation.id}/reservation`)

        if (response.data.error) {
            toast.error(response.data.error, { timeout: 3000 })
        } else {
            toast.success(response.data.message, { timeout: 3000 })
            emit('updated-place', response.data.place)
            console.log(response.data.place)
        }
    } catch (error) {
        console.log('Full error:', error)
    }
}

const startParking = async (place) => {
    const reservation = findReservationByUser(place, 'reserved')

    if (!reservation) {
        toast.error('No reservation found for this user.', { timeout: 3000 })
        return
    }

    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/start/${reservation.id}/parking`)

        if (response.data.error) {
            toast.error(response.data.error, { timeout: 3000 })
        } else {
            toast.success(response.data.message, { timeout: 3000 })
            emit('updated-place', response.data.place)
            console.log(response.data.place)
        }
    } catch (error) {
        console.log('Full error:', error)
    }
}


const endParking = async (place) => {
    const reservation = findReservationByUser(place, 'parked')

    if (!reservation) {
        toast.error('No reservation found for this user.', { timeout: 3000 })
        return
    }

    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/end/${reservation.id}/parking`)

        if (response.data.error) {
            toast.error(response.data.error, { timeout: 3000 })
        } else {
            toast.success(response.data.message, { timeout: 3000 })
            emit('updated-place', response.data.place)
            console.log(response.data.place)
        }
    } catch (error) {
        console.log('Full error:', error)
    }
}


 //find the reservation owned by a user
const findReservationByUser = (place, status) => {
    return place.reservations.find(r => r.user_id === 1 && r.status === status)
}


</script>

<style scoped>

</style>