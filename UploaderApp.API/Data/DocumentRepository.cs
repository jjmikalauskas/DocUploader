using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UploaderApp.API.Helpers;
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
            if (guidString.Contains("99"))
            {
                return await _context.DocumentInfo.FirstOrDefaultAsync(d => d.Id == 1);
            }
            return await _context.DocumentInfo.FirstOrDefaultAsync(d => d.Description == guidString);
        }

        public async Task<PagedList<DocumentInfo>> GetReport(ReportParams rptParams, string filter = "")
        {
            // DbSet<DocumentInfo> docs = _context.DocumentInfo; // as IQueryable<DocumentInfo>;
            if (!string.IsNullOrEmpty(filter)) {
               var q = _context.DocumentInfo.Where(doc => doc.LastName.Contains(filter) || doc.Company.Contains(filter));
               return await PagedList<DocumentInfo>.CreateAsync(q, rptParams.PageNumber, rptParams.PageSize);
            }
            else { 
                // DbSet<DocumentInfo> docs = _context.DocumentInfo;
                var docs = _context.DocumentInfo.Where(x => x != null);
                return await PagedList<DocumentInfo>.CreateAsync(docs, rptParams.PageNumber, rptParams.PageSize);
            }            
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}