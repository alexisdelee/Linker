#ifndef CS_SMALLOC_H_
#define CS_SMALLOC_H_

#define smalloc(size) xmalloc(size, __FILE__, __LINE__)
void *xmalloc(size_t, const char *, unsigned long);

#endif /* CS_SMALLOC_H_ */
