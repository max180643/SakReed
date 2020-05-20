export default function({ redirect, app, route }) {
  // If the user is not authenticated
  if (app.$cookies.get('fristTime') === 1 && route.name !== 'start') {
    return redirect('/start')
  } else if (!app.$cookies.get('uid')) {
    return redirect('/login')
  }
}
