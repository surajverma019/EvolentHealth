using System;

namespace EvolentHealth.API.Dtos
{
    public class ContactForReturnDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}