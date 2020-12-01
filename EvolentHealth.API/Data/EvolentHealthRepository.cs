
using System.Linq;
using System.Threading.Tasks;
using EvolentHealth.API.Helper;
using EvolentHealth.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EvolentHealth.API.Data
{
    public class EvolentHealthRepository : IEvolentHealthRepository
    {
        private readonly DataContext _context;
        public EvolentHealthRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveAll()
        {
           
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Contact> GetContact(int id)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(m => m.Id == id);
            return contact;
        }

        public async Task<PagedList<Contact>> GetContacts(ContactParams contactParams)
        {
            var contactsList = _context.Contacts.AsQueryable();
            contactsList = contactsList.OrderByDescending(c => c.CreatedOn);
            return await PagedList<Contact>.CreateAsync(contactsList, contactParams.PageNumber, contactParams.PageSize);
        }

    }
}