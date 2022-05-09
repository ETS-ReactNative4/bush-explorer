import { updateTrackStatus } from '../components/track/trackHelper'
import { getUserTracks } from '../components/user/userHelper'
import { getCurrentDateString, checkForNewBadges } from './actionHelper'

export const FETCH_MAP_TRACKS_PENDING = 'FETCH_MAP_TRACKS_PENDING'
export const FETCH_MAP_TRACKS_SUCCESS = 'FETCH_MAP_TRACKS_SUCCESS'
export const SET_TRACK_AS_COMPLETED = 'SET_TRACK_AS_COMPLETED'
export const SET_TRACK_AS_INCOMPLETE = 'SET_TRACK_AS_INCOMPLETE'
export const SET_TRACK_AS_SAVED = 'SET_TRACK_AS_SAVED'
export const SET_TRACK_AS_UNSAVED = 'SET_TRACK_AS_UNSAVED'

export function fetchMapAndTrackDataPending() {
  return {
    type: FETCH_MAP_TRACKS_PENDING,
  }
}

export function fetchMapAndTrackDataSuccess(tracks) {
  return {
    type: FETCH_MAP_TRACKS_SUCCESS,
    tracks,
  }
}

export function fetchMapAndTrackData() {
  return (dispatch) => {
    dispatch(fetchMapAndTrackDataPending())
    return getUserTracks().then((tracks) => {
      dispatch(fetchMapAndTrackDataSuccess(tracks))
      return null
    })
  }
}

export function setTrackAsCompleted(trackId, points) {
  return {
    type: SET_TRACK_AS_COMPLETED,
    points,
    trackId,
    lastCompletion: getCurrentDateString(),
  }
}
export function setTrackAsIncomplete(trackId) {
  return {
    type: SET_TRACK_AS_INCOMPLETE,
    trackId,
  }
}

export function setTrackAsSaved(trackId) {
  return {
    type: SET_TRACK_AS_SAVED,
    trackId,
  }
}

export function setTrackAsUnsaved(trackId) {
  return {
    type: SET_TRACK_AS_UNSAVED,
    trackId,
  }
}

export function completeTrack(trackId, userId, points) {
  return (dispatch) => {
    dispatch(setTrackAsCompleted(trackId, points))
    return updateTrackStatus(trackId, userId, 'completed', points)
      .then(() => {
        return checkForNewBadges(userId)
      })
      .then((badges) => {
        return
      })
  }
}

export function saveTrack(trackId, userId) {
  return (dispatch) => {
    dispatch(setTrackAsSaved(trackId))
    return updateTrackStatus(trackId, userId, 'saved').then(() => {
      return null
    })
  }
}
