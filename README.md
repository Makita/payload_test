# Stuff Used
* Ruby on Rails
  * better\_errors
  * bootstrap
    * jquery-rails
  * react-rails
  * rspec-rails
* React.js
  * Running off Sprockets
* Bootstrap

# Architecture
* Models
  * Ticket
    * id, status
    * updated\_at used for the completion time
  * Event
    * id, ticket\_id, category, measurement
    * Measurement auto-filled to 0 for start/stop
* Lib
  * Ticketer
    * Makes tickets/events and updates them accordingly
    * If ticket is made, need start event
    * If stop event is made, updates ticket
    * Prevents addition of more events after stop
    * Prevents creation of more than one start event
  * Exceptions
    * TicketAlreadyStopped
    * TicketAlreadyStarted (should never hit this one but it's here)
* React
  * App
    * Content
      * TicketDisplay
      * TicketForm
      * EventDisplay
      * EventForm
