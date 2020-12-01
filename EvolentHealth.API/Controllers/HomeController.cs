using System;
using System.Threading.Tasks;
using AutoMapper;
using EvolentHealth.API.Data;
using EvolentHealth.API.Dtos;
using EvolentHealth.API.Helper;
using EvolentHealth.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace EvolentHealth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        //private DataContext _context;
        private readonly IEvolentHealthRepository _repository;
        private readonly IMapper _mapper;

        public HomeController(IEvolentHealthRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts([FromQuery] ContactParams userParams)
        {
            var values = await _repository.GetContacts(userParams);
            return Ok(values);
        }

        [HttpGet("{id}", Name = "GetContact")]
        public async Task<IActionResult> GetContact(int id)
        {
            var contactFromRepo = await _repository.GetContact(id);
            var contact = _mapper.Map<ContactForReturnDto>(contactFromRepo);
            return Ok(contactFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> AddEditContact([FromForm] ContactForCreationDto contactForCreationDto)
        {
            Contact contact;
            if (contactForCreationDto.Id == 0)
            {
                contact = _mapper.Map<Contact>(contactForCreationDto);
                _repository.Add<Contact>(contact);
            }
            else
            {
                contact = await _repository.GetContact(contactForCreationDto.Id);
                contact.FirstName = contactForCreationDto.FirstName;
                contact.LastName = contactForCreationDto.LastName;
                contact.PhoneNumber = contactForCreationDto.PhoneNumber;
                contact.Email = contactForCreationDto.Email;
                contact.ModifiedOn = DateTime.Now;
            }

            if (await _repository.SaveAll())
            {
                var contactToReturn = _mapper.Map<ContactForReturnDto>(contact);
                return CreatedAtRoute("GetContact", new { id = contactToReturn.Id }, contactToReturn);
            }
            return BadRequest("Could not add/edit the contact");

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contactFromRepo = await _repository.GetContact(id);

            if (contactFromRepo == null)
                return BadRequest("Contact Not Exist");

            _repository.Delete(contactFromRepo);

            if (await _repository.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the photo !");

        }

    }
}