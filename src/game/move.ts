import { Agent, Location } from "./state"

export type Move = {
  newAgentLocations: Map<Agent, Location>
}