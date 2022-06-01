import UserList from '../model/UserList.js'

// Get User's Favorite Moive List
// @route api/list
const createUserList = async (req, res) => {
    const  {title, genres, id, overview, release_date, vote_average} = req.body
    const listParams = {}
    listParams.user = req.user.id

    if (title) listParams.title = title 
    if (id) listParams.id = id 
    if (overview) listParams.overview = overview 
    if (release_date) listParams.release_date = release_date 
    if (vote_average) listParams.vote_average = vote_average 
    if (genres) {
        listParams.genres = genres.map((genre) => genre)
      }

      try {
        // Using upsert option (creates new doc if no match is found):
        let userList = await UserList.findOneAndUpdate(
          { user: req.user.id },
          { $set: listParams },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        )
        return res.json(userList)
      } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
      }
}

// Get all profiles
// @route api/list/
// @access protected
const getAllLists = async (req, res) => {
	try {
		const userList = await UserList.find().populate('user', ['username'])
		console.log(userList)
		res.json(userList)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Error getting all profiles')
	}
}



export {createUserList, getAllLists}