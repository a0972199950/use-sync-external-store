import { uniqueNamesGenerator, adjectives, animals, colors } from 'unique-names-generator'
import { v4 as uuid } from 'uuid';

export const randomName = () => uniqueNamesGenerator({
  dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
  length: 2
})

export const randomId = () => {
  return uuid()
}
