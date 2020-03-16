using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UploaderApp.API.Models;

namespace UploaderApp.API.Data
{
    public class DocumentRepository : ISendLinkRepository
    {
        private readonly DataContext _context;
        public DocumentRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }     

        public async Task<DocumentInfo> GetEmailLink(Guid guid, string guidString)
        {
           return await _context.DocumentInfo.FirstOrDefaultAsync(d => d.Description == guidString);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}