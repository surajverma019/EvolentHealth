using System;
using System.ComponentModel.DataAnnotations;

namespace EvolentHealth.API.Dtos
{
    public class ContactForCreationDto
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "PhoneNumber should be of 10 digit")]
        public string PhoneNumber { get; set; }
        public bool Status { get; set; } = true;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public DateTime ModifiedOn { get; set; } = DateTime.Now;
        //public ContactForCreationDto()
        //{
        //    CreatedOn = DateTime.Now;
        //    Status = true;
        //}
    }
}