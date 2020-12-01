using System.Collections.Generic;
using System.Threading.Tasks;
using EvolentHealth.API.Helper;
using EvolentHealth.API.Models;

namespace EvolentHealth.API.Data
{
    public interface IEvolentHealthRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<Contact> GetContact(int id);
        Task<PagedList<Contact>> GetContacts(ContactParams contactParams);
       
    }
}