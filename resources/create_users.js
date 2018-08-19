const createInviteTree = function (users) {
  const results = []
  const storage = {}
  const maxChildren = 3
  users.forEach(user => {
    storage[user.id] = {
      parent: undefined
    }
  })

  // NOTE: "child" and "parent" here are the IDs for the child and parent
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    user.children = []
    // first user is always the root
    if (i === 0) {
      // first user always has second user as their child
      user.children.push(users[1].id)
      // last user never has a child
    } else if (i < users.length - 1) {
      // NOTE this is broken for 0 children
      // each user has between 1 and maxChildren number of children
      const numChildren = Math.floor(Math.random() * maxChildren) + 1
      let nextUserIndex = i + 1
      while (user.children.length < numChildren && nextUserIndex < users.length) {
        const potentialChildID = users[nextUserIndex].id
        if (!storage[potentialChildID].parent) {
          user.children.push(potentialChildID)
        }
        nextUserIndex++
      }
    }
    user.children.forEach(childID => {
      storage[childID].parent = user.id
    })
  }
  // TODO fix this
  // helper function that makes it possible for users to have 0 children
    // it finds users with no parent and assigns them a parent
  const assignParent = function () {
    const orphanIDs = []
    const potentialParentIDs = []
    for (let id in storage) {
      if (!storage[id].parent) {
        // find orphans
        orphanIDs.push(id)
      } else {
        // find potential parents
        let potentialParent = users.filter(user => user.id === id)[0]
        if (potentialParent.children.length < maxChildren) {
          potentialParentIDs.push(id)
        }
      }
    }
    // assign a parent to all orphanIDs
    for (let i = 0; i < orphanIDs.length; i++) {
      const randomParentIndex = Math.floor(Math.random() * potentialParentIDs.length)
      const randomParentID = potentialParentIDs[randomParentIndex]
      const randomParent = users.filter(user => user.id === randomParentID)[0]
      console.log("randomParent", randomParent);
      randomParent.children.push(orphanIDs[i])
      if (randomParent.children.length === maxChildren) {
        potentialParentIDs.splice(randomParentIndex, 1)
      }
    }
  }

  // TODO: uncomment this when fixed
  // assignParent()
  return users
}

const createUsers = function (num = 10) {
  num = (num > 50) ? 50 : (num < 1) ? 10 : Math.floor(num)
  let users = []
  const hashChars = '0123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ'
  const firstNames = ['Babette', 'Ellan', 'Rusty', 'Lilliam', 'Charlena', 'Denna', 'Francine', 'Teena', 'Marline', 'Raelene', 'Georgene', 'Sarita', 'Abe', 'Garnett', 'Lianne', 'Lillia', 'Charleen', 'Luetta', 'Bertie', 'Louie', 'Leida', 'Lacy', 'Kaye', 'Dede', 'Providencia', 'Hye', 'Nicol', 'Myriam', 'Maybelle', 'Agnes', 'Jenny', 'Derrick', 'Willetta', 'Cinda', 'Trudi', 'Johnsie', 'Rodney', 'Soon', 'Dovie', 'Micki', 'Carla', 'Marjory', 'Ella', 'Jasmin', 'Theressa', 'Barabara', 'Yu', 'Mariana', 'Fernande', 'Pearle']
  const lastNames = ['Clutter', 'Curiel', 'Cambre', 'Heilman', 'Riding', 'Hutchison', 'Kamerer', 'Rogge', 'Culbert', 'Tinner', 'Dustin', 'Mccullough', 'Korb', 'Carls', 'Rybak', 'Vetrano', 'Auton', 'Tremper', 'Bredeson', 'Spaeth', 'Sasaki', 'Zinn', 'Hoerr', 'Kirsch', 'Pippins', 'Ines', 'Belair', 'Ostrow', 'Beamer', 'Brodsky', 'Musser', 'Threadgill', 'Traughber', 'Mcduffee', 'Rohrbaugh', 'Wrench', 'Delahoussaye', 'Wilkes', 'Kearley', 'Klahn', 'Bramblett', 'Marrin', 'Eury', 'Sluder', 'Weidman', 'Shoffner', 'Finklea', 'Linkous', 'Kriger', 'Terrio']
  const lorem = ['Lorem', 'ipsum', 'dolor', 'amet', 'chicharrones', 'af', 'occupy', 'truffaut', 'mlkshk', 'succulents', 'intelligentsia', 'Adaptogen', 'master', 'cleanse', 'helvetica', 'raclette', 'Neutra', 'cred', 'lo-fi', 'flexitarian', 'Cred', 'XOXO', 'woke', 'tacos', 'meditation', 'drinking', 'vinegar', 'vegan', 'put', 'a', 'bird', 'on', 'it', 'jean', 'shorts', 'etsy', 'poke', 'man', 'braid', 'Squid', 'jianbing', 'af', 'master', 'cleanse', 'Meggings', 'street', 'art', 'VHS', 'pop-up', 'ramps', 'woke', 'hexagon', 'kinfolk', 'Paleo', 'air', 'plant', 'bespoke', 'blog', 'heirloom', 'ramps', 'coloring', 'book', 'selvage', 'tbh', 'affogato', 'selfies', 'single-origin', 'coffee', 'VHS', 'viral', 'taiyaki', 'hoodie', 'messenger', 'bag', 'actually', 'heirloom', 'Ramps', 'gluten-free', 'heirloom', 'scenester', 'authentic', 'messenger', 'bag', 'forage', 'Lo-fi', 'slow-carb', 'meh', 'irony', 'pabst', 'heirloom', 'hammock', 'gluten-free', 'brunch', 'sartorial', 'distillery', 'seitan']

  // TODO create a helper function to check for duplicate hashes between all users
  function createHash (len = 6) {
    let hash = ''
    for (let i = 0; i < len; i++) {
      const hashChar = Math.floor(Math.random() * hashChars.length)
      hash += hashChars[hashChar]
    }
    return hash
  }

  for (let i = 0; i < num; i++) {
    const firstNameIndex = Math.floor(Math.random() * firstNames.length)
    const lastNameIndex = Math.floor(Math.random() * lastNames.length)
    let bioLength = Math.floor(Math.random() * lorem.length)
    bioLength = Math.max(5, bioLength)
    const user = {
      id: createHash(),
      bio: lorem.slice(0, bioLength).join(' ') + '.',
      created: new Date(),
      firstName: firstNames[firstNameIndex],
      lastName: lastNames[lastNameIndex],
      pointsTodo: Math.floor(Math.random() * 10),
      pointsDone: Math.floor(Math.random() * 100)
    }
    users.push(user)
  }
  // TODO check here for duplicate hashes
  users = createInviteTree(users)
  return users
}

module.exports = createUsers
