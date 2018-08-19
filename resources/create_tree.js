const createInviteTree = function (users) {
  const storage = {}
  users.forEach(user => {
    storage[user.id] = user
  })
  const addChildren = function (user) {
    const children = []
    let count = 0 // bail counter
    // for each user, remove their array of child IDs
    while (user.children.length > 0 && count < 100) {
      children.push(user.children.pop())
      count++
    }

    count = 0
    while (children.length > 0 && count < 100) {
      // push the children for their IDs in to the children array
      const childID = children.pop()
      user.children.push(storage[childID])
      count++
    }
    // call this function recursively over the added children
    if (user.children.length > 0) {
      user.children.forEach(addChildren)
    }
    return user
  }
  // assumes root is users[0]
  return addChildren(users[0])
}

module.exports = createInviteTree
